import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../SearchInput';

const mockedOnResult = jest.fn();
const mockedSearchFunc = () => new Promise((res)=>res({data:[]}));

describe("SearchInput", () => {
    test('should render input element', () => {
      render(<SearchInput 
        onResult = {mockedOnResult}
        searchFunc = { mockedSearchFunc }
      />);
      const inputElement = screen.getByPlaceholderText(/search station by name/i);
      expect(inputElement).toBeInTheDocument();
    });

    test('should be able to type into input', () => {
      render(<SearchInput 
        onResult = {mockedOnResult}
        searchFunc = { mockedSearchFunc }
      />);
      const inputElement = screen.getByPlaceholderText(/search station by name/i);
      fireEvent.change(inputElement, {target: {value: "Hanasaari"}})
        expect(inputElement.value).toBe("Hanasaari");
    });

})