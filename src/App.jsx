import {words} from './constants/words';
import React from 'react';
import {images} from './constants/images';
import {useState, useEffect} from 'react';


function AfisareLitere({cuvantul, litereSelectate, finisat, mesajul}){
 return <> <div style={{fontSize:'50px'}}>
    {!finisat?(cuvantul.split('').map((litera, index)=>{
        return  litereSelectate[index]?litereSelectate[index]:'_'
    }).join(' ')):(
        <p style={{ fontSize: '30px', marginTop: '20px' }}>{mesajul} <strong>{cuvantul}</strong></p>
    )}
    </div>
 </>
}

function AfisareButoane({litereAmestecate, selecteazaLitere, butoane}){
    return <>
     {litereAmestecate.map((litera, index)=>{
            return <button key={index} onClick={()=>selecteazaLitere(litera, index)} style={{padding:'10px', fontSize:'30px', marginRight:'10px', marginTop:'40px', border:'2px solid black', borderRadius:'4px', fontWeight:'bold', fontFamily:'Times New Roman'}} disabled={butoane.includes(index)}>
            {litera}
            </button>
        })}
    </>
}

function App() {
    const [cuvantul, setCuvantul]=useState('');
    const [litereAmestecate, setLitereAmestecate]=useState([]);
    const [litereSelectate, setLitereSelectate]=useState([]);
    const [indexImg, setIndexImg]=useState(0);
    const [finisat, setFinisat]=useState(false);
    const [textul, setTextul]=useState('');
    const [culoare, setCuloare]=useState('');
    const [mesajul, setMesajul]=useState('');
    const [ButonApasat, setButonApasat]=useState([]);

    useEffect(() => {
        cuvantAleatoriu();
      }, []);

    function cuvantAleatoriu(){
        const cuvant=words[Math.floor(Math.random()*words.length)];
        const literele=cuvant.split('');
        setCuvantul(cuvant);
        setLitereAmestecate([...literele].sort(() => Math.random() - 0.5));
        setLitereSelectate([]);
        setIndexImg(0);
        setFinisat(false);
        setTextul('Unscramble the word');
        setCuloare('black');
        setMesajul('The word was :');
        setButonApasat([]);
        }

    function selecteazaLitere(litera, index){
        if(finisat || ButonApasat.includes(index)) return;
        setButonApasat([...ButonApasat, index]);
        
        const noua_litera=[...litereSelectate, litera];
        setLitereSelectate(noua_litera);

        if(noua_litera.length===cuvantul.length){
            const cuvantFormat=noua_litera.join('');
            if(cuvantFormat===cuvantul){
                setTextul("YOU WIN");
                setFinisat(true);
                setCuloare('green');
                setMesajul('The word was indeed:');
            } else {
                if (indexImg+1>=images.length){
                    setTextul('YOU LOSE');
                    setFinisat(true);
                    setCuloare('red');
                }
                else {
                    setIndexImg(indexImg+1);
                    setLitereSelectate([]);
                    setButonApasat([]);
                }
            }
        }
    }

    return <><div style={{textAlign:'center', marginTop:'30px'}}>
        <h1 style={{marginBottom:'30px', color:culoare}}>{textul}</h1>
        <img src={images[indexImg]} width={200} height={200}/>
        <AfisareLitere cuvantul={cuvantul} litereSelectate={litereSelectate} finisat={finisat} mesajul={mesajul}/>
        <div>{!finisat?(<AfisareButoane litereAmestecate={litereAmestecate} selecteazaLitere={selecteazaLitere} butoane={ButonApasat}/>):(
            <button onClick={cuvantAleatoriu} style={{ marginTop: '40px', padding:'10px 30px', borderRadius:'5px',
             border:'2px solid black', fontSize:'30px', fontWeight:'bold', fontFamily:'Times New Roman'}}>
                    RESTART
            </button>
        )}</div>
        </div></>;
}

export default App;
