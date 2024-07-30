'use client';
import { useCharacter, useLayout, usePalette } from '@/hooks';
import { findCharacterByUUID } from '@/utils';
import { Box, Typography } from '@mui/material';

export const MainFooterCredit = () => {
	const palette = usePalette();
	const { selectedCharacterUuid } = useLayout();
	const { characters } = useCharacter();
	const currentCharacter = findCharacterByUUID({
		array: characters,
		uuid: selectedCharacterUuid || '',
	});

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="30px"
			maxWidth="1000px"
		>
			<Typography
				variant="body2"
				color={palette.text.disabled}
				width="90%"
				margin="0 auto"
				textAlign="end"
			>
				{currentCharacter ? `credit VOICEVOX:${currentCharacter?.name}` : ' '}
			</Typography>
		</Box>
	);
};
