import { useContext } from 'react'

import Button from '../Button'

import styles from './ToastPlayground.module.css'
import ToastShelf from '../ToastShelf/ToastShelf'
import { ToastContext } from '../ToastProvider/ToastProvider'
import { VariantType } from '../Toast/Toast'

const VARIANT_OPTIONS: VariantType[] = ['notice', 'warning', 'success', 'error']

function ToastPlayground() {
	const {
		handleSubmit,
		message,
		setMessage,
		variantSelected,
		setVariantSelected
	} = useContext(ToastContext)

	return (
		<div className={styles.wrapper}>
			<header>
				<img alt="Cute toast mascot" src="/toast.png" />
				<h1>Toast Playground</h1>
			</header>

			<ToastShelf />

			<form className={styles.controlsWrapper} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label
						htmlFor="message"
						className={styles.label}
						style={{ alignSelf: 'baseline' }}
					>
						Message
					</label>
					<div className={styles.inputWrapper}>
						<textarea
							id="message"
							value={message}
							onChange={(e) => {
								setMessage(e.target.value)
							}}
							className={styles.messageInput}
						/>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label}>Variant</div>
					<div
						className={`${styles.inputWrapper} ${styles.radioWrapper}`}
					>
						{VARIANT_OPTIONS.map((variant) => (
							<label
								htmlFor={`variant-${variant}`}
								key={`variant-${variant}`}
							>
								<input
									id={`variant-${variant}`}
									type="radio"
									name="variant"
									value={variant}
									checked={variant === variantSelected}
									onChange={(event) => {
										setVariantSelected(
											event.target.value as VariantType
										)
									}}
								/>
								{variant}
							</label>
						))}
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label} />
					<div
						className={`${styles.inputWrapper} ${styles.radioWrapper}`}
					>
						<Button>Pop Toast!</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ToastPlayground
