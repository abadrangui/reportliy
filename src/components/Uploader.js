import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import { firestore, storage } from '../firebase';
import { useSelector } from 'react-redux';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Uploader = ({ album }) => {
  const [files, setFiles] = useState([]);
  const albumZcode = "111"

  if (albumZcode === '') {
    return (
      <>
        Ямар нэг алдаа гарлаа та дахин оролдоно уу?
      </>
    )
  }

  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={true}
      acceptedFileTypes={['image']}
      instantUpload={true}
      name="files"
      allowReorder={true}


      server={{
        process: (_fieldName, file, _metadata, load, error, progress, _abort) => {

          const photoDoc = firestore.collection('photos').doc()
          const photoId = photoDoc.id

          const fileRef = `test/${photoId}-${file.name}`

          const task = storage.ref(fileRef).put(file);


          task.on('state_changed',
            snap => {
              progress(true, snap.bytesTransferred, snap.totalBytes);
            },
            err => {
              error(err.message);
            },
            () => {
              load(file.name);
              //   onRequestSave(id);
              storage.ref(fileRef).getDownloadURL().then(doc => {
                console.log("dataURL ", doc)
              })
              console.log("complete !")
            }
          );

        },
        load: (source, load, error, progress, abort) => {
          console.log("Source ", source);

          progress(true, 0, 1024);

        }
      }}




      labelIdle='Зургаа чирч авчрах эсвэл <span class="filepond--label-action">Энд дарж хуулах зургаа сонгоно уу!</span>'
      labelInvalidField='Энэ зургийн файл зураг биш байна'
      labelFileWaitingForSize='Файлын хэмжээг хүлээж байна'
      labelFileSizeNotAvailable='Хэт том файл байна'
      labelFileLoading='Уншиж байна'
      labelFileLoadError='Файлыг уншихад алдаа гарлаа'
      labelFileProcessing='Хуулж байна'
      labelFileProcessingComplete='Амжилттай хуулсан'
      labelFileProcessingAborted='Хуулахыг зогсоосон'
      labelFileProcessingError='Хуулахад алдаа гарсан'
      labelFileRemoveError='Файлыг устгахад алдаа гарлаа'
      labelTapToCancel='Түр зогсоох'
      labelTapToRetry='Дахин оролдох'
      labelTapToUndo='Устгах'
      labelButtonRemoveItem='Хасах'
      labelButtonAbortItemLoad='Зогсоох'
      labelButtonRetryItemLoad='Дахин оролдох'
      labelButtonAbortItemProcessing='Болих'
      labelButtonUndoItemProcessing='Буцаах'
      labelButtonRetryItemProcessing='Дахин оролдох'
      labelButtonProcessItem='Хуулах'

    />
  )
}

export default Uploader;