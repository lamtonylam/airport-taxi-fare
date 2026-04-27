import TextField from '@mui/material/TextField';

interface DistanceInputProps {
  value: number;
  onChange: (km: number) => void;
}

export const DistanceInput = ({ value, onChange }: DistanceInputProps) => (
  <TextField
    id="distance"
    label="Distance (km)"
    type="number"
    variant="outlined"
    value={value === 0 ? '' : value}
    onChange={(e) => {
      const km = Number(e.target.value) || 0;
      onChange(km);
    }}
    inputProps={{ min: 0 }}
    sx={{
      input: { color: '#fff' },
      label: { color: '#fff' },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#fff',
        },
        '&:hover fieldset': {
          borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#fff',
        },
      },
    }}
  />
);
