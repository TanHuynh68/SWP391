import { Container, Row } from "react-bootstrap";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState, useRef } from "react";

interface CarouselsProps {
  className?: string;
  children: React.ReactNode;
}

const Carousels: React.FC<CarouselsProps> = ({ children, className }) => {
  const [count, setCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const myRef = useRef<HTMLDivElement>(null);
  const arrowRefLeft = useRef<HTMLDivElement>(null);
  const arrowRefRight = useRef<HTMLDivElement>(null);

  const getScrollbarWidth = () => {
    return myRef.current ? myRef.current.scrollWidth - myRef.current.clientWidth : 0;
  };

  useEffect(() => {
    const height = myRef.current ? myRef.current.offsetHeight / 2.5 : 0;
    if (arrowRefLeft.current && arrowRefRight.current) {
      arrowRefLeft.current.style.top = `${height}px`;
      arrowRefRight.current.style.top = `${height}px`;
    }
  }, []);

  useEffect(() => {
    if (myRef.current?.scrollLeft === 0) {
      arrowRefLeft.current?.classList.add(`${style.endLeft}`);
    } else {
      arrowRefLeft.current?.classList.remove(`${style.endLeft}`);
    }

    if (myRef.current && myRef.current.scrollLeft >= getScrollbarWidth()) {
      arrowRefRight.current?.classList.add(`${style.endRight}`);
    } else {
      arrowRefRight.current?.classList.remove(`${style.endRight}`);
    }
  }, [isDragging, startX, scrollLeft, count]);

  const oncClickToScrollRight = () => {
    const width = myRef.current ? myRef.current.offsetWidth : 0;
    console.log("check width>>>", width);

    myRef.current?.scrollBy({
      left: 238,
      behavior: "smooth",
    });
    setCount((count) => count + 1);
  };

  const oncClickToScrollLeft = () => {
    myRef.current?.scrollBy({
      left: -238,
      behavior: "smooth",
    });
    setCount((count) => count - 1);
  };

  const onMouseDownHandle = (event: React.MouseEvent<HTMLElement>) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setScrollLeft(myRef.current ? myRef.current.scrollLeft : 0);
  };

  const onMouseMoveHandle = (event: React.MouseEvent<HTMLElement>) => {
    const listUser = document.querySelector(`.${style.liveList}`);
    if (isDragging && listUser && myRef.current) {
      const deltaX = event.clientX - startX;
      myRef.current.scrollLeft = scrollLeft - deltaX;
    }
  };

  const onMouseUpHandle = () => {
    setIsDragging(false);
  };

  return (
    <div className={className}>
      <Container fluid className={style.containerCarousels}>
        <Row
          ref={myRef}
          className={`d-grid ${style.liveList}`}
          onMouseDown={onMouseDownHandle}
          onMouseMove={onMouseMoveHandle}
          onMouseUp={onMouseUpHandle}
        >
          {children}
        </Row>
        <div ref={arrowRefLeft} className={`${style.arrowIcon} ${style.arrowLeft}`}>
          <IoIosArrowBack onClick={oncClickToScrollLeft} />
        </div>
        <div ref={arrowRefRight} className={`${style.arrowIcon} ${style.arrowRight}`}>
          <IoIosArrowForward onClick={oncClickToScrollRight} />
        </div>
      </Container>
    </div>
  );
};

export default Carousels;
