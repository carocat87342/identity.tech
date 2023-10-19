import React, { ReactNode, useEffect, useState } from 'react'
import {Container} from 'components'
// import Entry from './Entry'
// import Loader from 'components/Loader'
import {format} from 'date-fns';
import { DropzoneArea } from 'material-ui-dropzone';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import * as openpgp from 'openpgp';
import * as api from 'api/entries'
import publicKey from 'assets/publickey'
import EnhancedTable from 'components/Table';
import useStyles from './styles';
import { useDispatch, useSelector } from 'store';
import { getFiles } from 'store/user/actions';



export interface Column {
  id: 'filename' | 'size' | 'format' | 'uploadedOn' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  render?: (item: any, record: any, column: Column) => ReactNode;
}

const columns: Column[] = [
  { id: 'filename', label: 'Name', minWidth: 150 },
  { id: 'format', label: 'Format', minWidth: 150 },
  { id: 'size', label: 'File Size', minWidth: 150 },
  {
    id: 'uploadedOn',
    label: 'Uploaded At',
    minWidth: 150,
    align: 'left',
    render: (item, record, column) => (
      <TableCell key={record.id} align={column.align} role="checkbox">
        <span>{format(new Date(item), 'dd/MM/yyyy hh:mm:ss')}</span>
      </TableCell>
    )
  }
];

const Home: React.FC = () => {
  const classes = useStyles();
  const [uploading, setUploading] = useState(false);
  const token = useSelector(state => state.user.token);
  const files = useSelector(state => state.user.files) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getFiles());
    }
  }, [dispatch, token]);

  const onChange = (files:Blob[]) => {
    if (files && files.length > 0) {
      const file: any = files[files.length-1];
      const reader = new FileReader();

      reader.addEventListener('load', async (event) => {
        const filename: any = file.name;
        const size: number = file.size;
        const format: string = file.type;
        const publicKeys = await openpgp.readKey({ armoredKey: publicKey });
        // @ts-ignore
        const message = await openpgp.createMessage({ text: event.target.result });
        const encrypted = await openpgp.encrypt({
            message, // input as Message object
            encryptionKeys: publicKeys,
            // signingKeys: privateKey1 // optional
        });
        setUploading(true);
        // @ts-ignore
        await api.upload(filename, size, format, encrypted);
        setUploading(false);
        dispatch(getFiles());
      });
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Container navbar component="main">
      <p className={classes.title}>Upload your file</p>
      <DropzoneArea
        showPreviews={true}
        acceptedFiles={['.csv']}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{container: { spacing: 1, direction: 'row' }}}
        previewChipProps={{classes: { root: classes.previewChip } }}
        previewText="Selected files"
        onChange={(files) => onChange(files)}
        filesLimit={1}
      />
      <br />
      <br />
      <br />
      <EnhancedTable title="Uploaded Files" columns={columns} rows={files} />
      <Backdrop className={classes.backdrop} open={uploading}>
        <CircularProgress color="inherit" />
        File is being uploaded...<br/>please wait for a while
      </Backdrop>
    </Container>
  )
}

export default Home;
