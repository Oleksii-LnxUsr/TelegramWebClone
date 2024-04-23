export const rsMouseDownHandler = ({ e, setSidebarWidth, sidebarRef }) => {
    const x = e.clientX;
    const sbWidth = window.getComputedStyle(sidebarRef.current).width;
    const initialWidth = parseInt(sbWidth, 10);

    const mouseMoveHandler = (e) => {
        const dx = e.clientX - x;
        const newWidth = initialWidth + dx;

        if (newWidth >= 250) {
            setSidebarWidth(newWidth);
        }
    };

    const mouseUpHandler = () => {
        document.removeEventListener("mouseup", mouseUpHandler);
        document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
};
