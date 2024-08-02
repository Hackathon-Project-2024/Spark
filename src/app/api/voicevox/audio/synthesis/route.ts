// import { NextRequest, NextResponse } from 'next/server';
// import { axiosFetch } from '@/libs';
// import fs from 'fs';
// import path from 'path';

// export const POST = async (req: NextRequest): Promise<NextResponse> => {
// 	const body = await req.json();
// 	const { audioQueryResponse, speaker } = body;

// 	const fileName = `${Date.now()}.wav`;
// 	const filePath = path.join(process.cwd(), 'public', fileName);

// 	const response = await axiosFetch.post<ArrayBuffer>(
// 		`${process.env.VOICEVOX_ENDPOINT}/synthesis?speaker=${speaker}`,
// 		audioQueryResponse,
// 		undefined,
// 		{
// 			responseType: 'arraybuffer',
// 		}
// 	);

// 	fs.writeFileSync(filePath, Buffer.from(response));
// 	const audioFile = `/${fileName}`;

// 	return NextResponse.json(audioFile);
// };

// export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
// 	const body = await req.json();
// 	const { fileName } = body;
// 	const filePath = path.join(process.cwd(), 'public', fileName);

// 	try {
// 		if (fs.existsSync(filePath)) {
// 			fs.unlinkSync(filePath);
// 			return NextResponse.json({ message: 'File deleted successfully' });
// 		} else {
// 			return NextResponse.json({ message: 'File not found' }, { status: 404 });
// 		}
// 	} catch (error) {
// 		console.error('Error deleting file:', error);
// 		return NextResponse.json(
// 			{ message: 'Error deleting file' },
// 			{ status: 500 }
// 		);
// 	}
// };

import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';

interface AudioQueryResponse {
	audioQueryResponse: any; // ここは適切な型を使用してください
	speaker: number;
}

interface ErrorResponse {
	message: string;
	details?: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: AudioQueryResponse = await req.json();
		const { audioQueryResponse, speaker } = body;

		const fileName = `${Date.now()}.wav`;
		const filePath = path.join(process.cwd(), 'public', fileName);

		const response: AxiosResponse<ArrayBuffer> = await axios.post(
			`${process.env.VOICEVOX_ENDPOINT}/synthesis?speaker=${speaker}`,
			audioQueryResponse,
			{
				responseType: 'arraybuffer',
			}
		);

		if (response.status !== 200) {
			console.error('Error in API response:', response.statusText);
			return NextResponse.json(
				{ message: 'Error in API response' },
				{ status: response.status }
			);
		}

		fs.writeFileSync(filePath, Buffer.from(response.data));
		const audioFile = `/${fileName}`;

		return NextResponse.json(audioFile);
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error('Error in POST request:', error.message);
			return NextResponse.json(
				{ message: 'Internal Server Error', details: error.message },
				{ status: 500 }
			);
		} else {
			console.error('Unexpected error:', error);
			return NextResponse.json(
				{ message: 'Internal Server Error', details: 'Unexpected error' },
				{ status: 500 }
			);
		}
	}
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const body: { fileName: string } = await req.json();
		const { fileName } = body;
		const filePath = path.join(process.cwd(), 'public', fileName);

		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
			return NextResponse.json({ message: 'File deleted successfully' });
		} else {
			return NextResponse.json({ message: 'File not found' }, { status: 404 });
		}
	} catch (error: unknown) {
		console.error('Error deleting file:', error);
		return NextResponse.json(
			{ message: 'Error deleting file', details: (error as Error).message },
			{ status: 500 }
		);
	}
};
