import { useState } from 'react';
import classes from './contact-form.module.css';

function ContactForm() {
  const [ enteredEmail, setEnteredEmail ] = useState('');
  const [ enteredName, setEnteredName ] = useState('');
  const [ enteredMessage, setEnteredMessage ] = useState('');

  function sendMessageHandler(event) {
    event.preventDefault();

    const postData = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(postData)
    })
      .then((response) => response.json())
      .then((data) => console.log("DATA RES::", data));
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler} >
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' value={enteredEmail} onChange={(e)=>setEnteredEmail(e.target.value)} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' value={enteredName} onChange={(e)=>setEnteredName(e.target.value)} required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea id='message' rows='5' value={enteredMessage} onChange={(e)=>setEnteredMessage(e.target.value)} required ></textarea>
        </div>
         <div className={classes.actions}>
          <button>Send Message</button>
         </div>
      </form>
    </section>
  );
}

export default ContactForm;
