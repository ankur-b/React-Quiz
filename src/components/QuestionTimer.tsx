import { useState, useEffect } from "react";
const QuestionTimer = ({ timeout, onTimeout,mode }:{mode:string,timeout:number,onTimeout:()=>void}) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return ()=>{
        clearTimeout(timer)
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime: number) => prevRemainingTime - 100);
    }, 100);
    return () =>{
        clearInterval(interval)
    }
  }, []);
  return <progress id="progress" max={timeout} value={remainingTime} className={mode} />;
};
export default QuestionTimer