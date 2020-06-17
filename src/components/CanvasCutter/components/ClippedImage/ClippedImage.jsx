import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { ClippedImageWrapper, ClippedImageCanvas, IconWrapper } from './styles';
import { getShapeBounds } from '../shared/shapeHelpers';
import { FaTimesCircle } from 'react-icons/fa';

function useEffectDidMount(config) {
    React.useEffect(() => {
        if (_.get(config.canvasRef, 'current', null)) {
            const { isDraggable, imageSrc, shape, imageDimensions, offset, dimensions, HOLE_COLOR } = config;
            const ctx = config.canvasRef.current.getContext('2d');
            ctx.canvas.width = dimensions[0];
            ctx.canvas.height = dimensions[1];
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'white';
            ctx.fillStyle = HOLE_COLOR;
            shape.forEach(([x, y], index) => {
                const action = index === 0 ? 'moveTo' : 'lineTo';
                ctx[action](x - offset[0], y - offset[1]);
            });
            ctx.closePath();
            if (isDraggable) {
                ctx.clip();
                ctx.drawImage(imageSrc, -offset[0], -offset[1], imageDimensions.width, imageDimensions.height);
                ctx.stroke();
            } else {
                ctx.fill();
            }
        }
    }, [config]);
    return null;
}

export const ClippedImage = (props) => {
    const HOLE_COLOR = '#111';
    const [isDrag, setIsDrag] = useState(false);
    const [lastDragPosition, setLastDragPosition] = useState(null);
    const [offset] = useState(getShapeBounds(props.shape).offset);
    const [dimensions] = useState(getShapeBounds(props.shape).dimensions);
    const canvasRef = useRef();
    const config = useRef({shape: props.shape, canvasRef, HOLE_COLOR, offset, dimensions, ...props});
    useEffectDidMount(config.current);

    const startDrag = ({ clientX, clientY }) => {
        setIsDrag(true);
        setLastDragPosition([clientX, clientY]);
    };
    const drag = ({ clientX, clientY }, isFinalDrag = false) => {
        if (isDrag) {
            offset[0] += clientX - lastDragPosition[0];
            offset[1] += clientY - lastDragPosition[1];
            setIsDrag(!isFinalDrag);
            setLastDragPosition(isFinalDrag ? null : [clientX, clientY]);
        }
    };
    const stopDrag = (event) => drag(event, true);

    const dragActions = props.isDraggable ? { onMouseDown: startDrag, onMouseUp: stopDrag, onMouseMove: drag } : {};
    return (
        <ClippedImageWrapper offset={offset}>
            {props.isDraggable && (
                <IconWrapper className="removeButton" onClick={props.onRemove}>
                    <FaTimesCircle />
                </IconWrapper>
            )}
            <ClippedImageCanvas
                isDraggable={props.isDraggable}
                isDrag={isDrag}
                className="clippedImage"
                dimensions={dimensions}
                ref={canvasRef}
                {...dragActions}
            />
        </ClippedImageWrapper>
    );
};
