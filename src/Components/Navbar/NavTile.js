import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from './mobilenavbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
const NavTile = (props) => {
    const router = useRouter();
    const { pathname } = router;


    const [selected, setSelected] = useState('');

    const handleResize = () => {
        if(window.innerWidth < 1024)
            setSelected('')
    };
    useEffect(()=>{
        if(window.innerWidth >=1024){
            setSelected(pathname)
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

 
  return (
    <div className={styles.menuItems}>
        <div className={selected === props.link ? styles.selectd : styles.tab}>
            <Link href={props.link}>
                <Image alt="img" style={{ fill: 'black' }} src={selected === props.link ? props.ActiveIcon :props.icon} className={styles.icons}/>
                <span >
                    {props.title}
                </span>
            </Link>
        </div>
        
    </div>
  )
}

export default NavTile