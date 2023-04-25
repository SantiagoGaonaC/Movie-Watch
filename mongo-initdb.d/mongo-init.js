db.createUser(
    {
        user: "moviewatch",
        pwd: "moviewatch",
        roles: [
            {
                role: "readWrite",
                db: "MovieDB"
            }
        ]
    }
);