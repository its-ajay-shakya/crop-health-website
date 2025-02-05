from flask import Flask,request,render_template
import pickle
from numpy import asarray
import numpy as np
import cv2
import tensorflow as tf
from keras.utils import img_to_array,load_img
from googlesearch import search
import requests
from bs4 import BeautifulSoup
import regex
import gtts

app=Flask(__name__)


class_names=['Apple_scab','Apple_Black_rot','Cedar_apple_rust','healthy_apple',
'healthy_blueberry','healthy_cherry','cherry_Powdery_mildew','corn_cercospora_leaf_spot gray_leaf_spot',
'corn_common_rust','healthy_corn','corn_northern_leaf_blight','grape_black_rot',
'grapes_Esca(black_measles)','healthy_grape','grape_leaf_blight(isariopsis_leaf_spot)','Orange_haunglongbing(citrus_greening)',
'peach_bacterial_spot','peach_healthy','pepper_bell_bacterial_spot','healthy_pepper_bell','potato_early_blight',
'healthy_potato','potato_late_blight','healthy_raspberry','soybean_healthy','squash_powdery_mildew',
'strawberry_healthy','strawberry_leaf_scrorch','tomato_bacterial_spot','tomato_early_blight','tomato_healthy',
'tomato_late_blight','tomato_leaf_mold','tomato_septoria_leaf_spot','tomato_spider_mites two_spotted_spider_mite',
'tomato_target_spot','tomato_mosaic_virus','tomato_yellow_leaf_curl_virus'
]

label=[]
for i in range(len(class_names)):
    label.append(i)

class_label_dict={}
for i in range(len(class_names)):
    class_label_dict[label[i]]=class_names[i]

model=pickle.load(open('plant_model.pkl','rb'))

def predict_label(img_path):
    img=cv2.imread(img_path,1)
    img=np.array([cv2.resize(img,(256,256),interpolation=cv2.INTER_AREA)])
    
    p=model.predict(np.array(img))
    p_max=np.argmax(p[0])
    return class_names[p_max]
   
@app.route('/')
def main():
    return render_template('index.html')

p=''
@app.route('/output',methods=['GET','POST'])
def output():
    if request.method == 'POST':
        img=request.files['my_image']
        img_path='static/'+img.filename
        img.save(img_path)
        p=predict_label(img_path)
        return render_template('index.html',prediction=p)
@app.route('/output/next_page',methods=['GET','POST'])
def show():
 return render_template('recording.html') 
 
 @app.route('/output/next_page/text_to_voice',methods=['GET','POST'])
def text_to_speech():
    all_text=''
    query=p
    for url in search(query,tld='com',stop=2,lang='en'):
        res=requests.get(url)
        pickle.dump(res,open("res.pkl",'wb'))
#binary response content
        html_page=res.content
        soup=BeautifulSoup(html_page,'html.parser')
        text=soup.find_all('p')
        text=regex.sub('<.*?>',' ',str(text))
        all_text=all_text+' '+text
    message=all_text
    pickle.dump(message,open("all.pkl",'wb'))
    t1=gtts.gTTS(text=message,lang='en',slow=False)
    t1.save("template/solution.mp3")
    return render_template('recording.html') 


if __name__ =='__main__':
	app.debug = True
	app.run(debug = True)
