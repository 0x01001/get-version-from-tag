# Get version from tag action

This action get the version from tag.

## Usage

To be able to use this action, you must retreive all the history of the repository by using the `fetch-depth` option of the `actions/checkout@v4` as bellow

```yaml
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0 # Mandatory to use the generate version from tag action

- name: Get version from tag
  uses: 0x01001/get-version-from-tag@v1.0.0
```
