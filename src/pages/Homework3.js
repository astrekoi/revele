import React, { useState, useRef, useEffect, useCallback } from 'react';

const Homework3 = () => {
    const canvasRef = useRef(null);
    const [shapes, setShapes] = useState([
        ['circle', 50, 50, 10],
        ['square', 150, 50, 25],
        ['ellipse', 200, 200, 30, 40],
    ]);
    const [selectedShape, setSelectedShape] = useState('circle');
    const [currentColor, setCurrentColor] = useState(0);

    const animate = useCallback(() => {
        setCurrentColor(currentColor => (currentColor + 1) % 360);
        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        requestAnimationFrame(animate);
    }, [animate]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => {
            switch (shape[0]) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(shape[1], shape[2], shape[3], 0, 2 * Math.PI);
                    ctx.fillStyle = `hsl(${currentColor}, 100%, 50%)`;
                    ctx.fill();
                    break;
                case 'square':
                    ctx.fillStyle = `hsl(${currentColor}, 100%, 50%)`;
                    ctx.fillRect(shape[1] - shape[3], shape[2] - shape[3], shape[3] * 2, shape[3] * 2);
                    break;
                case 'ellipse':
                    ctx.beginPath();
                    ctx.ellipse(shape[1], shape[2], shape[3], shape[4], 0, 0, 2 * Math.PI);
                    ctx.fillStyle = `hsl(${currentColor}, 100%, 50%)`;
                    ctx.fill();
                    break;
                case 'bezier':
                    ctx.beginPath();
                    ctx.moveTo(shape[1], shape[2]);
                    ctx.bezierCurveTo(shape[3], shape[4], shape[5], shape[6], shape[7], shape[8]);
                    ctx.strokeStyle = `hsl(${currentColor}, 100%, 50%)`;
                    ctx.stroke();
                    break;
                default:
                    break;
            }
        });
    }, [shapes, currentColor]);

    const handleCanvasClick = e => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (selectedShape === 'ellipse') {
            setShapes([...shapes, [selectedShape, x, y, 10, 20]]);
        } else if (selectedShape === 'bezier') {
            setShapes([...shapes, [selectedShape, x, y, x + 50, y + 50, x + 100, y - 50, x + 150, y]]);
        } else {
            setShapes([...shapes, [selectedShape, x, y, 10]]);
        }
    }

    const handleShapeSelect = e => {
        setSelectedShape(e.target.value);
    }

    const [canvasWidth, setCanvasWidth] = useState(1200);
    const [canvasHeight, setCanvasHeight] = useState(1200);

    useEffect(() => {
        const canvas = canvasRef.current;
        const style = window.getComputedStyle(canvas.parentNode);
        const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        setCanvasWidth(canvas.parentNode.clientWidth - border);
        setCanvasHeight(canvas.parentNode.clientHeight - border);
        setCanvasHeight(700);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }, [canvasWidth, canvasHeight]);

    return (
        <div style={{ border: '1px solid black' }}>
            <canvas ref={canvasRef} onClick={handleCanvasClick}></canvas>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '10px' }}>
                <label htmlFor="circle" style={{ marginBottom: '5px' }}>
                    <input type="radio" id="circle" value="circle" checked={selectedShape === 'circle'} onChange={handleShapeSelect} />
                    Circle
                </label>
                <label htmlFor="square" style={{ marginBottom: '5px' }}>
                    <input type="radio" id="square" value="square" checked={selectedShape === 'square'} onChange={handleShapeSelect} />
                    Square
                </label>
                <label htmlFor="ellipse" style={{ marginBottom: '5px' }}>
                    <input type="radio" id="ellipse" value="ellipse" checked={selectedShape === 'ellipse'} onChange={handleShapeSelect} />
                    Ellipse
                </label>
                <label htmlFor="bezier" style={{ marginBottom: '5px' }}>
                    <input type="radio" id="bezier" value="bezier" checked={selectedShape === 'bezier'} onChange={handleShapeSelect} />
                    Bezier Curve
                </label>
            </div>
        </div>
    );
}

export default Homework3;