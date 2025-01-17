'use client';
import { useBreakPoint, useLayout, usePalette } from '@/hooks';
import { Box, Tooltip } from '@mui/material';
import {
	MainHeaderCommandsLeft,
	MainHeaderCommandsRight,
	MainHeaderLogo,
} from '../atom';
import { MenuOpen } from '@mui/icons-material';

export const MainHeader = () => {
	const { isLeftBar, setIsLeftDrawer, selectedContent } = useLayout();
	const breakpoint = useBreakPoint();
	const palette = usePalette();
	const isLeftBarOpen: boolean =
		!['xs', 'sm'].includes(breakpoint) && isLeftBar;

	return (
		<>
			<Box
				zIndex={100}
				position="fixed"
				left={isLeftBarOpen ? '350px' : 0}
				display="flex"
				justifyContent={
					['xs', 'sm'].includes(breakpoint) ? 'space-around' : 'space-between'
				}
				alignItems="center"
				width={isLeftBarOpen ? 'calc(100% - 350px)' : '100%'}
				height="60px"
				padding="0 20px"
				bgcolor={
					selectedContent === 'call'
						? palette.content.call.bg
						: palette.layout.mainLayout.header.bg
				}
			>
				{['xs', 'sm'].includes(breakpoint) ? (
					<>
						<Box
							display="flex"
							justifyContent="start"
							alignItems="center"
							width="50px"
							height="100%"
						>
							<Tooltip title="メニューを開く" placement="bottom">
								<MenuOpen
									sx={{
										cursor: 'pointer',
									}}
									onClick={() => setIsLeftDrawer(true)}
								/>
							</Tooltip>
						</Box>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							flexGrow={1}
							height="100%"
						>
							<MainHeaderLogo />
						</Box>
						<Box
							display="flex"
							justifyContent="end"
							alignItems="center"
							width="50px"
							height="100%"
						>
							<MainHeaderCommandsRight />
						</Box>
					</>
				) : (
					<>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							gap="15px"
						>
							{!isLeftBar && <MainHeaderCommandsLeft />}
							<MainHeaderLogo />
						</Box>
						<MainHeaderCommandsRight />
					</>
				)}
			</Box>

			<Box width="100%" height="60px" />
		</>
	);
};
