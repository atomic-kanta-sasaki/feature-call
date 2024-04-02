import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ChangeEvent, FormEvent } from 'react';

type Props = {
  email: string;
  password: string;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
};

export const LoginForm = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit
}: Props) => {

  return (
    <Card sx={{ width: 600 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          ログイン
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            type="email"
            label='メールアドレス'
            variant="filled"
            onChange={onChangeEmail}
            value={email}
            fullWidth
            autoFocus
          />
          <TextField
            type="password"
            label='パスワード'
            variant="filled"
            onChange={onChangePassword}
            value={password}
            fullWidth
            autoFocus
          />
        </form>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onSubmit}>ログイン</Button>
      </CardActions>
    </Card>
  );
}