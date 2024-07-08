window.onload = function() {
    const canvas = document.getElementById('drawing-board');
    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('color-picker');
    const brushSize = document.getElementById('brush-size');
    let drawing = false;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    function startDrawing(e) {
        drawing = true;
        draw(e);
    }

    function stopDrawing() {
        drawing = false;
        context.beginPath();
    }

    function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    context.lineWidth = brushSize.value;
    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value;

    context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

}

function clearCanvas() {
    const canvas = document.getElementById('drawing-board');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}
