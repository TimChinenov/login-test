import { render, fireEvent, waitFor, act } from "@testing-library/react";
import Login from "./login";
import { MemoryRouter } from "react-router-dom";
import { login } from "../account-management-api-sdk/account-management-api";
import { redirectToNewsfeed } from "../services/auth-service";

jest.mock('../account-management-api-sdk/account-management-api');
jest.mock('../services/auth-service');

describe("Login", () => {
    const username = "testuser"
    const password = "testpassword"
    let getByPlaceholderText: any
    let getByText: any

    beforeEach(() => {
        const component = render(
            <MemoryRouter>
              <Login />
            </MemoryRouter>
          );
      
          getByPlaceholderText = component.getByPlaceholderText;
          getByText = component.getByText;
    })

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it("should submit the login form data when the submit button is selected", async () => {
        (login as jest.Mock).mockImplementation(jest.fn().mockResolvedValue(true));
        (redirectToNewsfeed as jest.Mock).mockImplementation(jest.fn());

        const usernameInput = getByPlaceholderText("Username") as HTMLInputElement;
        const passwordInput = getByPlaceholderText("Password") as HTMLInputElement;
        const loginButton = getByText("Login");

        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(passwordInput, { target: { value: password } });

        expect(usernameInput.value).toBe(username)
        expect(passwordInput.value).toBe(password)

        await act(async () => {
            fireEvent.click(loginButton);
        });

        expect(login).toHaveBeenCalledWith('testuser', 'testpassword');
        await expect(redirectToNewsfeed).toHaveBeenCalled();
    })

    it("should not submit data if username is missing", async () => {
        (login as jest.Mock).mockImplementation(jest.fn().mockResolvedValue(true));
        (redirectToNewsfeed as jest.Mock).mockImplementation(jest.fn());

        const usernameInput = getByPlaceholderText("Username") as HTMLInputElement;
        const passwordInput = getByPlaceholderText("Password") as HTMLInputElement;
        const loginButton = getByText("Login");

        fireEvent.change(passwordInput, { target: { value: password } });

        expect(usernameInput.value).toBe("")
        expect(passwordInput.value).toBe(password)
        
        await act(async () => {
            fireEvent.click(loginButton);
        });

        expect(login).toHaveBeenCalledTimes(0)
        expect(redirectToNewsfeed).toHaveBeenCalledTimes(0)
    })

    it("should not submit data if passowrd is missing", async () => {
        (login as jest.Mock).mockImplementation(jest.fn().mockResolvedValue(true));
        (redirectToNewsfeed as jest.Mock).mockImplementation(jest.fn());

        const usernameInput = getByPlaceholderText("Username") as HTMLInputElement;
        const passwordInput = getByPlaceholderText("Password") as HTMLInputElement;
        const loginButton = getByText("Login");

        fireEvent.change(usernameInput, { target: { value: username } });

        expect(usernameInput.value).toBe(username)
        expect(passwordInput.value).toBe("")
        
        await act(async () => {
            fireEvent.click(loginButton);
        });

        expect(login).toHaveBeenCalledTimes(0)
        expect(redirectToNewsfeed).toHaveBeenCalledTimes(0)
    })
})
