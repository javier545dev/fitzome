describe('Welcome and login screens', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  //const {signupButton, loginButton, terms1, terms2} = initialFlow();

  it('elements in welcome screen should be visible', async () => {
    const signupButton = await element(by.id('navigate-sing-btn'));
    const loginButton = await element(by.id('navigate-login-btn'));
    const terms1 = await element(by.id('terms1-label'));
    const terms2 = await element(by.id('terms2-label'));
    await expect(signupButton).toBeVisible();
    await expect(loginButton).toBeVisible();
    await expect(terms1).toBeVisible();
    await expect(terms2).toBeVisible();
  });

  it('should go to signup screen', async () => {
    const signupButton = await element(by.id('navigate-sing-btn'));

    await signupButton.tap();
    await expect(
      element(
        by.text(
          'Crea una cuenta para comenzar con tu entrenamiento, ¡Es gratis!',
        ),
      ),
    ).toBeVisible();
    await element(by.id('sub-header-back-btn')).tap();
  });
});