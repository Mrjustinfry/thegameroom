'use strict'

function signupTemplate() {
    return `<div>
            <form for="signup" id="signup">
                <fieldset>
                    <h4 class="signUpHead">Sign Up!</h4>
                    <label>First Name: <input type="text" min="3" class="firstName" required /> </label>
                    <label>Last Name: <input type="text" min="3" class="lastName" required /></label>
                    <label>Choose a Username: <input type="text" min="3" maxlength="15" class="userName" required /></label>
                    <div id="#"></div>
                    <label>Password: <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required /></label>
                    <label>Re-enter Password: <input type="password" min="5" maxlength="20" required /></label>
                    <div id="#"></div>
                    <label>Switch friend code: <input type="text" class="switch" placeholder="SW-1234-5678-9000" pattern="[SW][ -][0-9]{4}[ -][0-9]{4}[ -][0-9]{4}" /></label>
                    <label>PS4 Gamertag: <input type="text" class="ps4" /></label>
                    <label>Xbox Gamertag: <input type="text" class="xbox" /></label>
                    <label>
                        Preferred Platform:
                        <select>
                            <option value="Nintendo">Nintendo</option>
                            <option value="Playstation">Playstation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PC">PC</option>
                        </select>
                    </label>
                    <button>Submit</button>
                </fieldset>
            </form>
        </div>`
};

