import React, { useState, useRef } from 'react';
import _ from 'lodash';
import {
    PreviewWrapper,
    PreviewImage,
    FileInput,
    FileInputBox,
    FileInputText,
    IconWrapper,
    ImageSelectorWrapper,
    SelectButton
} from './styles';
import { messages } from './messages';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheck } from 'react-icons/fa';

export const ImageSelector = (props) => {
    const [imageSrc, setImageSrc] = useState('');
    const inputRef = useRef();
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        setImageSrc(event.target.result);
    });

    const readUrl = () => {
        const selectedFile = _.get(inputRef, 'current.files[0]', null);
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    const onImageSelect = () => {
        props.onImageSelected(imageSrc);
    };

    const renderPreview = () =>
        imageSrc && (
            <PreviewWrapper>
                <SelectButton className="selectImageButton" onClick={onImageSelect}>
                    <FaCheck/>
                </SelectButton>
                <PreviewImage className="previewImage" src={imageSrc} alt="preview" />
            </PreviewWrapper>
        );

    return (
        <ImageSelectorWrapper>
            {!imageSrc ? (
                <FileInputBox>
                    <FileInputText>
                        <IconWrapper>
                            <FaCloudUploadAlt />
                        </IconWrapper>
                        <p className="selectImageText">{messages.pleaseSelect}</p>
                    </FileInputText>
                    <FileInput
                        onChange={readUrl}
                        className="fileSelection"
                        type="file"
                        name="file"
                        id="fileSelection"
                        ref={inputRef}
                    />
                </FileInputBox>
            ) : (
                renderPreview()
            )}
        </ImageSelectorWrapper>
    );
};
