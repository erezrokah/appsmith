const firstApiName = "First";
const secondApiName = "Second";

describe("Api Naming conflict on a page test", function() {
  it("expects actions on the same page cannot have identical names", function() {
    cy.log("Login Successful");
    // cy.NavigateToQueryEditor();
    cy.NavigateToAPI_Panel();
    // cy.log("Navigation to API Panel screen successful");
    cy.CreateAPI(firstApiName);

    cy.NavigateToAPI_Panel();
    cy.CreateAPI(secondApiName);

    cy.GlobalSearchEntity(secondApiName);
    cy.RenameEntity(firstApiName);
    cy.validateMessage(firstApiName);
    cy.ClearSearch();

    cy.DeleteAPIFromSideBar();
    cy.DeleteAPIFromSideBar();
  });
});

describe("Api Naming conflict on different pages test", function() {
  it("it expects actions on different pages can have identical names", function() {
    cy.log("Login Successful");
    // create a new API
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(firstApiName);

    // create a new page and an API on that page
    cy.Createpage("Page2");
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(secondApiName);
    cy.RenameEntity(firstApiName);
    cy.get(".bp3-popover-content").should("not.exist");

    // delete API and Page2
    cy.DeleteAPIFromSideBar();
    cy.DeletepageFromSideBar("Page2");

    // delete API created on Page 1
    cy.DeleteAPIFromSideBar();
  });
});

describe("Entity Naming conflict test", function() {
  it("expects JS objects and actions to not have identical names on the same page.", function() {
    cy.log("Login Successful");

    // create JS object and name it
    cy.createJSObject('return "Hello World";');
    cy.RenameEntity(firstApiName);

    // create API and rename it, expect error to occur
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(secondApiName);

    cy.GlobalSearchEntity(secondApiName);
    cy.RenameEntity(firstApiName);
    cy.validateMessage(firstApiName);
    cy.ClearSearch();

    cy.deleteJSObject();
    cy.DeleteAPIFromSideBar();
    cy.NavigateToHome();
  });
});
