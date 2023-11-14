export const routes = [
  {
    "path": "host",
    "file": "modules/host/_layout.tsx",
    "options": {},
    "children": [
      {
        "path": "",
        "file": "modules/host/index.tsx",
        "options": {
          "index": true
        },
        "children": []
      },
      {
        "path": "tenants",
        "file": "modules/host/tenants/_layout.tsx",
        "options": {},
        "children": [
          {
            "path": "",
            "file": "modules/host/tenants/index.tsx",
            "options": {
              "index": true
            },
            "children": []
          },
          {
            "path": "new",
            "file": "modules/host/tenants/new.tsx",
            "options": {},
            "children": []
          },
          {
            "path": ":id",
            "file": "modules/host/tenants/show.tsx",
            "options": {},
            "children": []
          },
          {
            "path": ":id/edit",
            "file": "modules/host/tenants/edit.tsx",
            "options": {},
            "children": []
          },
          {
            "path": ":id/delete",
            "file": "modules/host/tenants/delete.tsx",
            "options": {},
            "children": []
          }
        ]
      }
    ]
  },
  {
    "path": "admin",
    "file": "modules/admin/_layout.tsx",
    "options": {},
    "children": [
      {
        "path": "",
        "file": "modules/admin/index.tsx",
        "options": {
          "index": true
        },
        "children": []
      },
      {
        "path": "leagues",
        "file": "modules/admin/leagues/_layout.tsx",
        "options": {},
        "children": [
          {
            "path": "",
            "file": "modules/admin/leagues/index.tsx",
            "options": {
              "index": true
            },
            "children": []
          },
          {
            "path": "new",
            "file": "modules/admin/leagues/new.tsx",
            "options": {},
            "children": []
          },
          {
            "path": ":id",
            "file": "modules/admin/leagues/show.tsx",
            "options": {},
            "children": []
          }
        ]
      }
    ]
  },
  {
    "path": "",
    "file": "modules/public/_layout.tsx",
    "options": {},
    "children": [
      {
        "path": "",
        "file": "modules/public/index.tsx",
        "options": {
          "index": true
        },
        "children": []
      }
    ]
  },
  {
    "path": "util",
    "file": "modules/util/_layout.tsx",
    "options": {},
    "children": [
      {
        "path": "tenants",
        "file": "modules/util/tenants.tsx",
        "options": {
          "index": true
        },
        "children": []
      }
    ]
  }
];