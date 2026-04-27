import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface CityCentreToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CityCentreToggle = ({
  checked,
  onChange,
}: CityCentreToggleProps) => (
  <FormControlLabel
    control={
      <Checkbox
        id="toCityCentre"
        name="toCityCentre"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          color: '#ededed',
          '&.Mui-checked': {
            color: '#90caf9',
          },
        }}
      />
    }
    label="Are you travelling to the Helsinki city centre?"
    className="mb-2 px-4"
  />
);
