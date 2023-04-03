import cl from "./MainArea.module.css"

const MainArea :React.FC = () =>{


    return(<span className={[cl.MainAreaWrapper].join(' ')}>
        <p className={[cl.MainAreaText].join(' ')}>Open-source.</p>
        <p className={[cl.MainAreaText].join(' ')}>Secure.</p>
        <p className={[cl.MainAreaText].join(' ')}>Fast.</p>
    </span>);
}

export default MainArea;