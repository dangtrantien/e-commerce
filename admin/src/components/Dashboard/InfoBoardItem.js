import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';

import styles from './InfoBoardItem.module.css';

// ==================================================

const InfoBoardItem = (props) => {
  const sendRequest = useHttp();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    sendRequest({ url: props.url })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        if (result.total) {
          setTotal(result.total);
        } else {
          setTotal(result.length);
        }
      })
      .catch((err) => console.log(err));
  }, [sendRequest, props.url]);

  return (
    <Card className={styles['card-container']}>
      <div>
        {props.isMoney && (
          <p className={styles.total}>
            {total.toLocaleString('de-DE')}
            <span>VND</span>
          </p>
        )}

        {!props.isMoney && <p>{total}</p>}

        <span className={styles.title}>{props.title}</span>
      </div>

      {props.icon}
    </Card>
  );
};

export default InfoBoardItem;
