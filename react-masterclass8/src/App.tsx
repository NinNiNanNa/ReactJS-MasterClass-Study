import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  // selector의 set property를 실행시키는 함수 사용 전
  // const hours = useRecoilValue(hourSelector);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;
