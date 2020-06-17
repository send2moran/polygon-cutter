import React, { useState, useRef } from 'react';
import { DrawCanvas, GUILayerWrapper } from './styles';
import { getShapeBounds } from '../shared/shapeHelpers';

const AREA_THRESHOLD = 50 * 50;

export const GUILayer = (props) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [shape, setShape] = useState([]);
    const [bounds, setBounds] = useState(null);
    const canvasRef = useRef();

    const makeSureContextIsAvailable = () => {
        if (canvasRef.current) {
            setBounds(canvasRef.current.getBoundingClientRect());
        }
    };

    const initiateShape = (position) => {
        canvasRef.current.getContext('2d').beginPath();
        canvasRef.current.getContext('2d').setLineDash([5, 5]);
        canvasRef.current.getContext('2d').lineWidth = '4';
        canvasRef.current.getContext('2d').strokeStyle = 'white';
        canvasRef.current.getContext('2d').fillStyle = 'rgba(255, 255, 255, 0.2)';
        canvasRef.current.getContext('2d').moveTo(...position);
    };

    const lineToPoint = (point) => {
        canvasRef.current.getContext('2d').clearRect(0, 0, bounds.width, bounds.height);
        canvasRef.current.getContext('2d').lineTo(...point);
        canvasRef.current.getContext('2d').stroke();
        canvasRef.current.getContext('2d').fill();
    };

    const finalizeShape = () => {
        canvasRef.current.getContext('2d').closePath();
        canvasRef.current.getContext('2d').clearRect(0, 0, bounds.width, bounds.height);
    };

    const startDrawing = ({ clientX, clientY }) => {
        makeSureContextIsAvailable();
        if (!isDrawing) {
            const { left, top } = canvasRef.current.getBoundingClientRect();
            const position = [clientX - left, clientY - top];
            initiateShape(position);
            setIsDrawing(true);
            setShape([position]);
        }
    };

    const endDrawing = ({ clientX, clientY }) => {
        if (isDrawing) {
            const { left, top } = canvasRef.current.getBoundingClientRect();
            const position = [clientX - left, clientY - top];
            updateShape(position, true);
            finalizeShape(position);
            const { area } = getShapeBounds(shape);
            if (area >= AREA_THRESHOLD) props.onShapeComplete(shape);
        }
    };

    const moveDrawing = ({ clientX, clientY }) => {
        if (isDrawing) {
            const { left, top } = bounds;
            const position = [clientX - left, clientY - top];
            updateShape(position);
            lineToPoint(position);
        }
    };

    const updateShape = (position, closeShape = false) => {
        const _shape = [...shape];
        _shape.push(position);
        if (closeShape) _shape.push(shape[0]);
        setShape(_shape);
        setIsDrawing(!closeShape);
    };

    return (
        <GUILayerWrapper>
            <DrawCanvas
                ref={canvasRef}
                className="drawingArea"
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={moveDrawing}
                {...props.dimensions}
            />
        </GUILayerWrapper>
    );
};
