import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';

import { RemoveGroupButton } from './RemoveGroupButton';

export function ImagePicker({
	setImage,
	imageURL
}: {
	imageURL: string;
	setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}) {
	const [file, setFile] = useState<string>(imageURL);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files?.[0]) {
			setFile(URL.createObjectURL(files[0]));
			setImage(files[0]);
		}
	};

	// handle click event of the Remove button
	const handleRemoveClick = () => {
		setFile('');
	};

	useEffect(() => {
		console.log(imageURL);

		setFile(imageURL);
	}, [imageURL]);

	return (
		<Container>
			{file ? (
				<div style={{ position: 'relative' }}>
					<SelectedImage src={file} id='selected_images' alt='selected_image' />

					<RemoveGroupButton
						style={{
							width: '3rem',
							height: '3rem',
							top: '-1rem',
							right: '0'
						}}
						icon_width='25'
						onClick={handleRemoveClick}
					/>
				</div>
			) : (
				<label htmlFor='image_picker'>
					<Icon icon='bx:bxs-camera' color='#c4171c' width='50' />
				</label>
			)}

			<input
				id='image_picker'
				type='file'
				name='filename'
				accept='image/gif, image/jpeg, image/png'
				alt='image upload'
				onChange={e => handleChange(e)}
				onClick={(e: MouseEvent<HTMLInputElement>) => {
					const element = e.target as HTMLInputElement;
					element.value = '';
				}}
			/>
		</Container>
	);
}

const Container = styled.div`
	margin: 2rem auto;
	display: flex;
	align-items: center;
	flex-direction: row;

	label {
		width: 15rem;
		height: 15rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: ${p => p.theme.lightGrey};
		border-radius: 6px;
		cursor: pointer;
	}

	input {
		display: none;
	}
`;

const SelectedImage = styled.img`
	height: 15rem;
	width: 15rem;
	object-fit: cover;
	margin-right: 2rem;
`;
