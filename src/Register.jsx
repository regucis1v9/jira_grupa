
import './Register.css';

function Register() {
  return (
    <div className="main">
      <div className="container" id="inputContainer">
        <form className='form'>
          <h1>Get Started Now</h1>
          <div className="inputContainer">
            <label htmlFor="">
              Name
              <input type="text" className='input' placeholder='Enter your name'/>
              <p></p>
            </label>
            <label htmlFor="">
              Email adress
              <input type="text" className='input' placeholder='Enter your email'/>
              <p></p>
            </label>
            <label htmlFor="">
              Password
              <input type="text" className='input' placeholder='Enter your password'/>
              <p></p>
            </label>
            <div className="lol">
              <button className='submit'>Register</button>
            </div>

          </div>
          <div className='text'>Have an account? <a href="">Log in</a></div>
        </form>
      </div>
      <div className="container" id="imgContainer">
        <img src="https://images.pexels.com/photos/1687341/pexels-photo-1687341.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
      </div>
    </div>
  );
}

export default Register;
