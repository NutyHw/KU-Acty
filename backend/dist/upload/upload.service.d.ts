import { FileDto } from './dto/file.dto';
import { Model } from 'mongoose';
import { File, FileDocument } from './schema/file.schema';
export declare class UploadService {
    private fileModel;
    constructor(fileModel: Model<FileDocument>);
    create(fileDto: FileDto): Promise<File>;
}
