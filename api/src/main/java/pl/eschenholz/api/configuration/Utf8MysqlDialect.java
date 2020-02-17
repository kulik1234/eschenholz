package pl.eschenholz.api.configuration;

import org.hibernate.dialect.MySQL5Dialect;

public class Utf8MysqlDialect extends MySQL5Dialect {

    @Override
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
}
