from fastapi import FastAPI , Request
from generator import generator
from keras.models import load_model
import tensorflow as tf
import numpy as np
import requests
from PIL import Image
from io import BytesIO
import pydicom
from pydicom.pixel_data_handlers.util import apply_voi_lut
import cv2
import numpy as np
from pydicom.dataset import Dataset
import pydicom
from pydicom.dataset import Dataset, FileDataset
from pydicom.uid import ExplicitVRLittleEndian
import pydicom._storage_sopclass_uids
import requests
from io import BytesIO
from pydicom import dcmread, dcmwrite
from pydicom.filebase import DicomFileLike

from pydicom.dataset import  FileMetaDataset
from pydicom.sequence import Sequence
import threading


model = load_model("classification_model.keras")




def predict(image, size=224):
    c_img = tf.cast(image, tf.float32)
    c_img = tf.image.resize(c_img, [size,size])
    c_img = tf.expand_dims(c_img, axis=0)
    print(c_img.shape)
    pred = model.predict(c_img)
    return pred





def preprocess_dicom(dcm):
    image = dcm.pixel_array
    
    image_win = apply_voi_lut(image, dcm)
    
    if np.sum(image_win) == 0:
        image_win = image

    pixels = image_win - np.min(image_win)
    pixels = pixels / np.max(pixels)
    image = (pixels * 255).astype(np.uint8)

    if dcm.PhotometricInterpretation == "MONOCHROME1":
        inverted_image = 255 - image
        image = tf.cast(inverted_image, tf.uint8)

    image = np.stack([image] * 3, axis=-1)

    h,w=image.shape[0],image.shape[1]
    max_dir=max(w,h)
    padded_image = np.zeros((max_dir, max_dir,3), dtype=image.dtype)

    left_zeros = np.sum(image[:,:image.shape[1]//2] == 0)
    right_zeros = np.sum(image[:,image.shape[1]//2:] == 0)

    if left_zeros >= right_zeros:
        padded_image[0:image.shape[0]:, max_dir - image.shape[1]:] = image[:,:,:]  # Right lateral, pad on the left side
    else:
        padded_image[0:image.shape[0], :image.shape[1],:] = image[:,:,:]  # Left lateral, pad on the right side

    image_resized = cv2.resize(padded_image, (512, 512))
    
    print(image_resized.shape)
    
    return image_resized 



def Get_Result(dcm):
    dcm = pydicom.dcmread(BytesIO(dcm))
    image = preprocess_dicom(dcm)
    pred=predict(image)
    if pred >= 0.5:
        pred=True
    else:
        pred=False

    return {"classification":pred, "laterality": dcm.ImageLaterality }
