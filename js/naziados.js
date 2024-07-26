'use strict';

(function () {

    let lastZIndex = 0;

    function initCloseButtons () {
        document.addEventListener('click', function(event) {
            let closeButton = event.target.closest('.box-close');
            if (closeButton) {
                let box = closeButton.parentNode.parentNode.parentNode;
                box.style.display = 'none';
            }
        });
    }

    function initMinimizeButtons () {
        document.addEventListener('click', function(event) {
            let minimizeButton = event.target.closest('.box-minimize');
            if (minimizeButton) {
                let box = minimizeButton.parentNode.parentNode.parentNode;
                box.querySelectorAll('.box-body').forEach(function (box) {
                    box.style.display = 'none';
                });
            }
        });
    }

    function initMaximizeButtons () {
        document.addEventListener('click', function(event) {
            let maximizeButton = event.target.closest('.box-maximize');
            if (maximizeButton) {
                let box = maximizeButton.parentNode.parentNode.parentNode;
                box.querySelectorAll('.box-body').forEach(function (box) {
                    box.style.display = 'flex';
                    box.style.direction = 'column';
                });
            }
        });
    }

    function initDraggableBox() {
        document.addEventListener('mousedown', function(event) {
            const boxTitle = event.target.closest('.box-title');
            if (boxTitle) {
                let box = boxTitle.parentNode.parentNode.parentNode;
                if (box.classList.contains('box-draggable')) {

                    let nextZIndex = lastZIndex++;

                    const initialX = event.clientX;
                    const initialY = event.clientY;

                    const initialDivX = box.offsetLeft;
                    const initialDivY = box.offsetTop;

                    box.style.zIndex = nextZIndex;

                    const onMouseMove = function(e) {
                        const newX = initialDivX + (e.clientX - initialX);
                        const newY = initialDivY + (e.clientY - initialY);

                        box.style.position = 'absolute';
                        box.style.left = `${newX}px`;
                        box.style.top = `${newY}px`;
                    };

                    const onMouseUp = function(e) {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    };

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }
            }
        });
    }

    function initBoxButtons () {
        initCloseButtons();
        initMinimizeButtons();
        initMaximizeButtons();
    }

    function initBox () {
        initBoxButtons();
        initDraggableBox();
    }

    function init () {
        initBox();
    }

    function main () {
        init();
    }

    main();
})();
