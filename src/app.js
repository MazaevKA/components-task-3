import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const nums = data;

	const [operand1, setOperand1] = useState('0');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
  const [isFinish, setIsFinish] = useState(false)

  let displayValue = operand1 + operator + operand2
	const onClickButtonNum = (item) => {
    if (operand1 === '0') {
      setOperand1(item)
    } else if (operator) {
      setOperand2(prevState => prevState + item);
    } else {
      setOperand1(prevState => prevState + item);
    }
    console.log('operand1', operand1);
    console.log('operand2', operand2);
    console.log('operator', operator);
	}

  const clearConst = () => {
    setOperand2('');
    setOperator('');
    setIsFinish(true);
  }

  const onClickButtonOperator = (item) => {
    switch (item) {
      case '÷':
        setOperator('/')
        break
      case '*':
        setOperator('*')
        break
      case '-':
        setOperator('-')
        break
      case '+':
        setOperator('+')
        break
      case 'C':
        setOperand1('')
        setOperand2('')
        setOperator('')
        displayValue = '0'
        break
      case '=':
        handSet();
        break
    }
  }

  const handSet = () => {
    switch (operator) {
      case '+':
        setOperand1(Number(operand1) + Number(operand2));
        clearConst();
        break
      case '-':
        setOperand1(Number(operand1) - Number(operand2));
        clearConst();
        break
      case '/':
        setOperand1(Number(operand1) / Number(operand2));
        clearConst();
        break
      case '*':
        setOperand1(Number(operand1) * Number(operand2));
        clearConst();
        break
    }
  }

  console.log(operator);

	return (
		<div className={styles.container}>
			<div className={styles.calc}>
				<div className={styles.calc__header}>
					<div className={styles.calc__cross}>
						<span className={styles.calc__line}></span>
						<span className={styles.calc__line}></span>
					</div>
					<label className={styles.calc__label} htmlFor="calc__input">
            <input className={styles.calc__input + ' ' + (isFinish ? styles.calc__input_red : '')} id="calc__input" type="text" placeholder="0" value={displayValue}/>
					</label>
				</div>

				<div className={styles.calc__buttons}>
        {nums.map((item) => (
						<button
              className={styles.calc__button + ' ' + (!isNaN(item.button) ? styles.calc__button_num : '') + ' ' + styles[item.name]}
              key={item.id}
              disabled={(!item.enabled)}
              onClick={(!isNaN(item.button) && item.name !== 'result') ? () => onClickButtonNum(item.button) : () => onClickButtonOperator(item.button)}
            >
              {item.button}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
