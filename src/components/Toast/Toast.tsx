import { useContext } from 'react'
import {
	AlertOctagon,
	AlertTriangle,
	CheckCircle,
	Info,
	X
} from 'react-feather'

import styles from './Toast.module.css'
import { ToastContext } from '../ToastProvider/ToastProvider'

const ICONS_BY_VARIANT = {
	notice: Info,
	warning: AlertTriangle,
	success: CheckCircle,
	error: AlertOctagon
}

export type ToastType = {
	id: string
	type: VariantType
	message: string
}

export type VariantType = keyof typeof ICONS_BY_VARIANT

function Toast({ id, type = 'notice', message }: ToastType) {
	const IconComponent = ICONS_BY_VARIANT[type]
	const { removeToast } = useContext(ToastContext)

	return (
		<div className={`${styles.toast} ${styles[type]}`}>
			<div className={styles.iconContainer}>
				<IconComponent size={24} />
			</div>
			<p className={styles.content}>{message}</p>
			<button
				className={styles.closeButton}
				aria-label="Dismiss message"
				aria-live="off"
				onClick={() => {
					removeToast(id)
				}}
			>
				<X size={24} />
			</button>
		</div>
	)
}

export default Toast
