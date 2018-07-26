import { h } from 'preact';
import style from './style.less';
import { Link } from 'react-router-dom';

const Files = ({data})=>{
  const files = data.map((item)=>{
    const itemParts = item.name.split('#');
    const date = itemParts[0].replace(/-/g, ' ');
    const name = itemParts[1].replace(/-/g, ' ');
    return (
      <li>
        <Link to={`/budget/${item.id}`}>
        <div class={style.cover}>
        <img src="./assets/logo-square.png"/>
        </div>
          <div class={style.label}>
              <div class={style.label}>{date}</div>
              <h5>{name}</h5>
          </div>
        </Link>
      </li>
    );
  })
  return (
    <ul class={style.files}>
      {files}
    </ul>
  )
}

export default Files;