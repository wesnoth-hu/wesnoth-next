import styles from '../styles/Register.module.css'
import Image from "next/image"
import validator from 'validator'
import { useState } from 'react'
import { useMutation } from "@apollo/client"
import { REGISTER } from '../gql/Register/REGISTER';

export default function Register({handleShowRegister,handleShowLogin}) {

    
    // username input value
    var [usernameInput, setUsernameInput] = useState("");
    // email input value
    var [emailInput, setEmailInput] = useState("");
    // password input value
    var [passwordInput, setPasswordInput] = useState("");
    // dropdown list
    const [value, setValue] = useState('bat');

    // username validator
    const [errorUserMsg, setErrorUserMsg] = useState('');
    // email validator
    const [errorEmailMsg, setErrorEmailMsg] = useState('');
    // password validator
    const [errorPassMsg, setErrorPassMsg] = useState('');

    // submit button enable/disable
    const [toggleRegBtn, setToggleRegBtn] = useState(true);

    

    const validateUser = (value) => {
        if (!validator.isEmpty(value) && validator.isAlphanumeric(value) && validator.isLength(value, {
            min: 3, max: 16,
          })) {
            setErrorUserMsg('')
        } else {
            setErrorUserMsg('A felhasználónév nem lehet üres, 3-16 karakter közti hosszúságú lehet, csak betűket és/vagy számokat tartalmazhat.')
            setToggleRegBtn(true)
        }
    }

    const validateEmail = (value) => {
        if (!validator.isEmpty(value) && validator.isEmail(value, {
            allow_display_name: true, require_display_name: false, allow_utf8_local_part: true, 
            require_tld: true, allow_ip_domain: false, domain_specific_validation: false, 
            blacklisted_chars: '', host_blacklist: []
        })) {
            setErrorEmailMsg('')
        } else {
            setErrorEmailMsg('A megadott email-cím formátuma nem megfelelő.')
            setToggleRegBtn(true)
        }
    }

    const validatePass = (value) => {
        if (!validator.isEmpty(value) && validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        }) && validator.isLength(value, {
            min: 8, max: 16,
        })) {
            setErrorPassMsg('')
            if (validateUser && validateEmail) {
                setToggleRegBtn(false)
            }
        } else {
            setErrorPassMsg('A jelszó 8-16 karakter közti hosszúságú lehet, minimum egy kicsi és egy nagy betűt, egy számot és szimbólumot kell tartalmaznia.')
            setToggleRegBtn(true)
        }
    }

    // register mutation
    const [register, { data, loading, error }] = useMutation(REGISTER, {
        variables: {
            "data": {
                "name": usernameInput,
                "email": emailInput,
                "password": passwordInput,
                "race": {
                    "connect": {
                        "name": value
                    }
                },
                "adminRole": null,
                "userRole": "Pending",
            }
        }
      });

    return (
    <>
    {loading ? 
        <div>Folyamatban...</div> : error ? 
        <div>Folyamat hiba: {error.message}</div> :
    <div className={styles.register}>
        <form className={styles.form}
            onSubmit={e => {
                e.preventDefault();
                register();
                setValue('bat');
          }}>
            <div><label htmlFor="username">Felhasználónév:</label></div>
            <input type="text" name="username" onChange={(u) => {validateUser(u.target.value); setUsernameInput(u.target.value)}} className={styles.username}/>
            {errorUserMsg === '' ? null : 
                <span style={{
                    fontWeight: 'thin',
                    color: 'red',
                }}>{errorUserMsg}</span>}

            <div><label htmlFor="email" className={styles.dist}>Email:</label></div>
            <input type="email" name="email" onChange={(e) => {validateEmail(e.target.value); setEmailInput(e.target.value)}} className={styles.email}/>
            {errorEmailMsg === '' ? null : 
                <span style={{
                        fontWeight: 'thin', 
                        color: 'red',
                }}>{errorEmailMsg}</span>}

            <div><label htmlFor="password" className={styles.dist}>Jelszó:</label></div>
            <input type="password" name="password" onChange={(p) => {validatePass(p.target.value); setPasswordInput(p.target.value)}} className={styles.password}/>
            {errorPassMsg === '' ? null :
                <span style={{
                        fontWeight: 'thin',
                        color: 'red',
                }}>{errorPassMsg}</span>}
            
            <div><label htmlFor="faj" className={styles.dist}>Faj:</label></div>
            <div>
            <select name="faj" onChange={(e) => {setValue(e.target.value)}} className={styles.select}>
                    <option value="bat" >Denevérek</option>
                    <option value="dunefolk" >Dűnék-népe</option>
                    <option value="human" >Emberek</option>
                    <option value="undead" >Élőholtak</option>
                    <option value="wose" >Fapásztorok</option>
                    <option value="wolf" >Farkasok</option>
                    <option value="gryphon">Griffek</option>
                    <option value="saurian" >Gyíkok</option>
                    <option value="goblin" >Koboldok</option>
                    <option value="horse" >Lovak</option>
                    <option value="mechanical" >Mechanikus</option>
                    <option value="naga" >Nagák</option>
                    <option value="ogre" >Ogrék</option>
                    <option value="orc" >Orkok</option>
                    <option value="drake" >Perzsekények</option>
                    <option value="merfolk" >Sellők</option>
                    <option value="falcon" >Sólymok</option>
                    <option value="monster" >Szörnyek</option>
                    <option value="dwarf" >Törpök</option>
                    <option value="troll" >Trollok</option>
                    <option value="elf" >Tündék</option>
            </select>
            </div>
            <div className={styles.fajkep}>
                {/* fajok képeit mutatja kattintásra a listából */}
                <Image 
                    src={`/fajok/${value}.png`}
                    alt={`${value}-icon`}
                    width={72}
                    height={72}
                    priority
                />
            </div>
            <div className={styles.button}>
                <button disabled={toggleRegBtn}>Regisztrálok</button>
            </div>
        </form>
        </div>}

        <div className={styles.showRegister}>
          <ul className={styles.showRegisterUL}>
            <li>
              <p className={styles.showRegisterP} onClick={() => {handleShowRegister(false),handleShowLogin(false)}}>Bejelentkezés</p>
            </li>
          </ul>
        </div>
    </>
    ) 
}

