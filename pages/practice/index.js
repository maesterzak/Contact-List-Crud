import styles from "./main.module.css";

function Practice() {
  function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    console.log('form values', form_values)
  }

  return (
    <>
      <div className={`${styles.main}`}>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
          <label htmlFor="#name"> Name</label>
          <input className={`${styles.input}`}
            placeholder="Enter contact name"
            type={"text"}
            id="name"
            name="name"
          />


          <label htmlFor="#address"> Short Info</label>
          <textarea className={`${styles.textarea}`}
            placeholder="Enter contact address"
            type={"text"}
            id="short_info"
            name="short_info"
          />


          <label htmlFor="#gender">Select gender</label>
          <select name="gender" id="gender">
            <option defaultValue={"opt1"}>Male</option>
            <option defaultValue={"opt2"}>Female</option>
          </select>

          

          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">Submit</button>
          </div>
</form>
      </div>
    </>
  );
}
export default Practice;
