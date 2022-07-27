import { OnePage } from './pages';
import { UsersProvider } from './hooks';

export default function App() {
  return (
    <UsersProvider>
      <OnePage />
    </UsersProvider>
  );
}
