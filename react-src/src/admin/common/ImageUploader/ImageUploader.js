import React, { useState } from 'react';
import Button from '../Button/Button';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelect }) => {
	const [selectedImage, setSelectedImage] = useState(null);

	const openMediaModal = () => {
		// Make sure wp.media object is available
		if (window.wp && window.wp.media) {
			const mediaModal = window.wp.media({
				title: 'Select Image',
				multiple: false,
				library: {
					type: 'image',
				},
			});

			// When an image is selected in the media frame...
			mediaModal.on('select', () => {
				// Get media attachment details from the frame state
				const attachment = mediaModal.state().get('selection').first().toJSON();

				// Update local state
				setSelectedImage(attachment.url);

				// Send the attachment URL to the callback function
				if (onImageSelect) {
					onImageSelect(attachment.url);
				}
			});

			// Open the modal
			mediaModal.open();
		}
	};

	return (
		<div>
			<Button type="button" onClick={openMediaModal}>
				Upload Image
			</Button>
			{selectedImage && (
				<div className="image-preview">
					<img src={selectedImage} alt="Selected" />
				</div>
			)}
		</div>
	);
};

export default ImageUploader;
