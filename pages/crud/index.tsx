import Head from 'next/head'
import Image from 'next/image'
import styles from '../crud/index.module.css'
import { useState } from 'react'
import { PrismaClient, Contact } from '@prisma/client'
import { Router } from 'next/router'

const prisma = new PrismaClient();

export async function getServerSideProps() {

    const contacts:Contact[] = await prisma.contact.findMany();
    return {
        props: {
            initialContact: contacts    
            
        }
    }
}

function Crud({ initialContact }:{initialContact:any}) {
    const [contactList, setContact] = useState(initialContact)

    async function editContact(contact:any){
        const response = await fetch ('/api/updateContact', {
            method: 'POST',
            body:JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        
        const e = await response.json()
        console.log('ee', e)
        setContact(e)
        setFormvalue({})
        setEditing(false)
    }
    const handleEdit =(e:any) =>{
        e.preventDefault();
        var formData = new FormData(e.target);

        const form_values = Object.fromEntries(formData);
        console.log(form_values)
        editContact(form_values)
        e.target.reset()


    }

    async function saveContact(contact:any){
        const response = await fetch ('/api/contacts', {
            method: 'POST',
            body:JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        
        const e = await response.json()
        console.log('ee', e)
        setContact([...contactList, e])
        
        
    }
    const handleSubmit = (e:any) => {
        e.preventDefault()
        var formData = new FormData(e.target);

        const form_values = Object.fromEntries(formData);
        const value = {
            name:form_values.name,
            email:form_values.email,
            address:form_values.address,
            gender:form_values.gender,
            image:form_values.image
        }
        
        saveContact(value)
        e.target.reset()
        
    }

    const [formValue, setFormvalue] = useState<any>({})
    const editing = (e:any) => {
        console.log('xx',e.target['name'])
        var q = e.target['name']
        setEditing(true)
        var x = contactList[q]
        console.log(x)
        const formValue ={
            id : x.id,
            name: x.name,
            email: x.email,
            address: x.address,
            image: x.image,
            gender: x.gender,
    
        } 
        setFormvalue(formValue) 


    }

    async function Handle_delete (e:any) {
        var q = e.target['name']
        const response = await fetch ('/api/deleteContact', {
            method: 'POST',
            body:JSON.stringify(q)
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const w = await response.json()
        setContact(w)
        
    }


    const [edit, setEditing] = useState(false)
    const setEditingToggller = ()=>{
        setEditing(!edit)
    }
    
    
    return (

        <>
            <Head>

            </Head>
            <div className={styles.main}>
                <h1 style={{"display":"flex", "justifyContent":"center"}}>C.R.U.D functionality using next.js, typescript and prisma</h1>
                <div className={styles.main_1}>
                    <div className={styles.left_main}>
                        {edit ? <h2>Edit contact</h2> : <h2>Add contacts</h2>}
                        
                        <form onSubmit={edit ?  handleEdit:handleSubmit }
                        
                        className={styles.contact_form}>
                            <input defaultValue={formValue.id} className={styles.hidden} type={'text'} id="id" name="id" />
                            <label htmlFor="#name"> Name</label>
                            <input defaultValue={formValue.name} className={styles.input} placeholder='Enter contact name' type={'text'} id="name" name="name" />
                            <label  htmlFor="#email">Email</label>
                            <input defaultValue={formValue.email} className={styles.input} placeholder='Enter contact email' type={"email"} id="email" name="email" />
                            <label htmlFor="#address"> Address</label>
                            <input defaultValue={formValue.address} className={styles.input} placeholder='Enter contact address' type={"text"} id="address" name="address" />
                            <label htmlFor="#image">Enter image url</label>
                            <input defaultValue={formValue.image} className={styles.input} placeholder='Enter contact address' type={"text"} id="image" name="image" />
                            <label htmlFor="#gender">Select gender</label>
                            <select defaultValue={formValue.gender} name='gender' id='gender'>

                                <option defaultValue={"opt1"}>Male</option>
                                <option defaultValue={"opt2"}>Female</option>
                            </select>
                            <br />
                            <div style={{ "display": "flex", "justifyContent": "center" }}>
                                <button className={styles.button} type='submit'>Submit</button>
                            </div>

                        </form>

                    </div>

                    <div className={styles.right_main}>

                        <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                            <h2>Contacts List</h2> <button onClick={()=>setEditingToggller()} style={{"height":"2em"}} >{edit ? 'Editmode' : 'viewMode'}</button>
                        </div>
                        {contactList.length ==0 ? <div style={{"display":"flex", "justifyContent":"center","alignItems":"center","height":"100%"}}><h3>No contacts found</h3></div> : <>
                        {contactList.map(function (contact:Contact, id:string) {
                            return (
                                <div key={id} className={styles.right_main1}>
                                    
                                    <div className={styles.image_container}>
                                        <Image alt='user_image' width={100} height={100} layout='responsive' src={'/testimonials-5.jpg'} />
                                    </div>
                                    <div className={styles.text_box}>
                                        <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                                            <span><b>{contact.name}</b></span>
                                            {edit ? 
                                            <div className={`${styles.editing_tools}`}>
                                                <button name={id} onClick={editing}>Edit</button ><button name={contact.id} onClick={Handle_delete}>Delete</button>
                                            </div>:''}
                                        </div>
                                        <br />
                                        <div className={styles.text_box_links}>
                                            <span>Email: {contact.email}</span><span>Address: {contact.address}</span><span>Gender: {contact.gender}</span>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}</>}




                    </div>
                </div>

            </div>
        </>
    )
}
export default Crud;