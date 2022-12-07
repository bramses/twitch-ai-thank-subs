import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Overlay.module.css'
import {useState, useEffect} from "react";

export default function Overlay({ text = 'yo findleton thanks', subName = 'findleton', voice = '' }) {

    let [imageSrc, setImageSrc] = useState('')

    let textWithSubName = text
    if (text.includes(subName)) {
        const re = new RegExp(subName, 'g')
        const coloredText = text.replace(re, `<span class="${styles.subName}">${subName}</span>`)
        textWithSubName = coloredText
    }

    useEffect(() => {
        if (voice === 'Rick Sanchez') {
            // img src
            setImageSrc('https://media.giphy.com/media/UQh7ChBhMJhi1GBYwf/giphy.gif')
        } else if (voice === 'Eminem') {
            setImageSrc("https://media.giphy.com/media/xT0xeMsdbCgPwu94re/giphy.gif")
        } else if (voice === 'Mario') {
            setImageSrc("https://media.giphy.com/media/DEtkVjNn16kNPJ5gR1/giphy.gif")
        } else if (voice === 'Sonic') {
            setImageSrc("https://media.giphy.com/media/LMQgs60HFzAfdZYKtn/giphy.gif")
        } else if (voice === 'Peter Griffin') {
            setImageSrc("https://media.giphy.com/media/96ciETgT883Bu/giphy.gif")
        }
    }, [])

    return (
            <div id={"container"} className={styles.container}>
                <div id={"text"} className={styles.textWrapper}>
                    <p className={styles.text} dangerouslySetInnerHTML={{ __html: textWithSubName }}></p>
                </div>
                <div id={"image"}  className={styles.textWrapper}>
                    <img src={imageSrc}/>
                </div>
            </div>
    )
}
