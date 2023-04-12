import { useContext } from 'react'

import Toast from '../Toast'
import styles from './ToastShelf.module.css'
import { ToastContext } from '../ToastProvider/ToastProvider'

function ToastShelf() {
	const { toasts } = useContext(ToastContext)

	return (
		<ol
			className={styles.wrapper}
			role="region"
			aria-live="polite"
			aria-label="Notification"
		>
			{toasts.map(({ id, message, type }) => (
				<li className={styles.toastWrapper} key={`variant${id}`}>
					<Toast id={id} type={type} message={message} />
				</li>
			))}
		</ol>
	)
}

export default ToastShelf
