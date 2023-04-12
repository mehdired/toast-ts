import { useState, createContext, useEffect, FormEvent } from 'react'
import { ToastType, VariantType } from '../Toast/Toast'

type ToastContextType = {
	toasts: ToastType[]
	message: string
	setMessage: (message: string) => void
	variantSelected: VariantType
	setVariantSelected: (variant: VariantType) => void
	handleSubmit: (event: FormEvent<HTMLFormElement>) => void
	removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType>(
	{} as ToastContextType
)

type ToastProviderProps = {
	children: React.ReactNode
}

function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<ToastType[]>([])
	const [message, setMessage] = useState('')
	const [variantSelected, setVariantSelected] =
		useState<VariantType>('notice')

	const removeToast = (id: string) => {
		setToasts(toasts.filter((toast) => toast.id !== id))
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		setToasts([
			...toasts,
			{ id: crypto.randomUUID(), message, type: variantSelected }
		])
		setMessage('')
		setVariantSelected('notice')
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setToasts([])
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<ToastContext.Provider
			value={{
				toasts,
				message,
				setMessage,
				variantSelected,
				setVariantSelected,
				handleSubmit,
				removeToast
			}}
		>
			{children}
		</ToastContext.Provider>
	)
}

export default ToastProvider
