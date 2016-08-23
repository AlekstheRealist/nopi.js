# nopi
### *Nopi* is a CLI Tool for generating a simple Node API.

___
### Installation

<strong>To Install *Nopi*:</strong>

```$ npm install nopi -g```

To see a list of commands:

```$ nopi```
___
### Project Generation

<strong>To Generate a new API:</strong>

```$ nopi new apiName```

When you create a new project, *Nopi* will run ```npm install``` automatically in the created project directory. All you have to do is be patient, it is not frozen.

Once it is done, cd to project and start the server with:

```$ npm start```

___
### File Generation

<strong>To generate a new controller or model file:</strong>

```$ nopi controller fileName```

```$ nopi model fileName```   


<strong>Use these commands in the root of your project.</strong>

##### <strong>On File Creation Specifics:</strong>

On file creation, *Nopi* will look through your working project directory for controller and model folders and create the corresponding file type. If none of these folders exist, *Nopi* will create the file in the root of your project.

Controllers which are generated should be added to the ```index.js``` to connect and route with intended endpoint. Once the controller is setup inside of the index controller, it is connected to your API.

*Nopi* also creates ```.nopiPath``` folder in your project and saves the path of the file type generated. This is to optimize the speed of file creation. By saving this path *Nopi* does not have to dynamically find the folder again after each generated file.

If your project directory changes at all, delete ```.nopiPath``` folder to recache folder paths. ```.nopiPath``` folder is added to ```.gitignore``` also.

You cannot create files that already exist.

### Contribute
<strong>If you would like to contribute, it would be greatly appreciated.</strong>

___
#### <strong>For help and more commands:</strong>

```$ nopi -h``` | ```$ nopi -V``` | ```$ nopi```

___
