from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
from pathlib import Path
import ast
import json
import os
import shutil

#init app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, headers='Content-Type')
basedir = os.path.abspath("/")#return the absolute path of the directory we're currently in

#현재 디렉토리에있는 모든 항목을 반환하는 함수 
def returnItems(directory):
    files = [os.path.join(directory,f) for f in os.listdir(directory) if os.path.isfile(os.path.join(directory,f))]
    dirs = [os.path.join(directory,f) for f in os.listdir(directory) if os.path.isdir(os.path.join(directory,f))]
    links = [os.path.join(directory,f) for f in os.listdir(directory) if os.path.islink(os.path.join(directory,f))]
    result = {"files":files,"dirs":dirs,"links":links}
    return result


@app.route('/', methods=['POST'])
def get_items():
    contentDict = {}
    json = request.json['body']
    new_dir=ast.literal_eval(json)['path']
    returned_items = returnItems(new_dir)
    return jsonify({'files':returned_items["files"],'dirs':returned_items["dirs"],'links':returned_items["links"]})

@app.route('/add', methods=['POST'])
def add_item():
    contentDict = {}
    json = request.json['body']
    new_dict=ast.literal_eval(json)
    path = str(new_dict['path'])
    parent = str(new_dict['parent'])
    error = ""

    try:
        if(new_dict['type'] == 'file'):
            Path(path).touch()
        elif(new_dict['type'] == 'folder'):
            Path(path).mkdir()    
    except:
        error = "I'm sorry but you don't have permission to modify this directory"

    returned_items = returnItems(parent)
    return jsonify({'files':returned_items["files"],'dirs':returned_items["dirs"],'links':returned_items["links"],'error':error})
    

@app.route('/remove', methods=['POST'])
def remove_item():
    contentDict = {}
    json = request.json['body']
    new_dict=ast.literal_eval(json)
    path = str(new_dict['path'])
    parent = str(new_dict['parent'])
    item_type = str(new_dict['type'])
    error = ""

    try:
        if (item_type == "file"):
            os.remove(path)
        elif (item_type == "folder"):
            shutil.rmtree(path)
        elif (item_type == "link"):
            os.unlink(path)
    except:
        error = "I'm sorry but you don't have permission to modify this directory"
    
    returned_items = returnItems(parent)
    return jsonify({'files':returned_items["files"],'dirs':returned_items["dirs"],'links':returned_items["links"],'error':error})

@app.route('/move', methods=['POST'])
def move_item():
    contentDict = {}
    json = request.json['body']
    new_dict=ast.literal_eval(json)
    old = str(new_dict['old'])
    new = str(new_dict['new'])
    error = ""

    try:
        shutil.move(old,new)
    except:
        error = "I'm sorry but you don't have permission to modify this directory"
    
    returned_items = returnItems(new)
    return jsonify({'files':returned_items["files"],'dirs':returned_items["dirs"],'links':returned_items["links"],'error':error})

@app.route('/edit', methods=['POST'])
def edit_title():
    contentDict = {}
    json = request.json['body']
    new_dict=ast.literal_eval(json)
    old = str(new_dict['old'])
    new= str(new_dict['new'])
    parent= str(new_dict['parent'])
    error = ""
    
    try:
        os.rename(old,new)
    except:
        error = "I'm sorry but you don't have permission to modify this directory"
    
    returned_items = returnItems(parent)
    return jsonify({'files':returned_items["files"],'dirs':returned_items["dirs"],'links':returned_items["links"],'error':error})



@app.route('/link', methods=['POST'])
def add_link():
    contentDict = {}
    json = request.json['body']
    new_dict=ast.literal_eval(json)
    dest= str(new_dict['dest'])
    target= str(new_dict['target'])
    parent= str(new_dict['parent'])
    error = ""
    try:
        os.symlink(target, dest,target_is_directory=True)
    except:
        error = "I'm sorry but you can't create this link in this directory"
    
    returned_items = returnItems(parent)
    return jsonify({'files':returned_items["files"],'dirs':returned_items["dirs"],'links':returned_items["links"],'error':error})


#run server
if __name__ == '__main__':
    app.run(debug=True)



print(basedir)