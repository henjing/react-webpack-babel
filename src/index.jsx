import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import styles from './index.less';
import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div className={styles.wrapper + ' ' +  'clearfix'}>
        <h1>It Works!</h1>
        <p>This React project just works including <span className={styles.blueBg}>module</span> local styles.</p>
        <p>Global bootstrap css import works too as you can see on the following button.</p>
        <p><a className="btn btn-primary btn-lg"><span className="fa fa-safari"></span>Enjoy!</a></p>
      </div>
    )
  }
}

render(<App/>, document.querySelector("#app"));
