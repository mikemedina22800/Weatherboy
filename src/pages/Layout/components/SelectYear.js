import { Select, MenuItem } from "@mui/material";

const currentYear = new Date().getFullYear()
const years = new Array(currentYear - 1850).fill(0)

const SelectYear = ({year, setYear, active}) => {
  return (
    <Select className="bg-white h-10 w-fit !rounded-lg" defaultValue={0} value={year} onChange={(e) => {setYear(e.target.value)}}>
      <MenuItem value={0}>Active ({active?.length})</MenuItem>
      {years.map((_, index) => {
        const selectedYear = currentYear - index;
        return (<MenuItem key={selectedYear} value={selectedYear}>{selectedYear}</MenuItem>);
      })}
    </Select>
  )
}

export default SelectYear